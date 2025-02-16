import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

class VolcEngine {
    constructor() {
        this.ak = process.env.API_KEY;
        this.sk = process.env.API_SECRET;
        this.service = 'cv';
        this.version = '2022-08-31';
        this.region = 'cn-north-1';
        this.host = 'visual.volcengineapi.com';
        this.contentType = 'application/json';
        this.defaultBody = {};
    }

    calculateSignature(requestParam, credential) {
        const xDate = requestParam.date;
        const shortXDate = xDate.substring(0, 8);
        const xContentSha256 = crypto.createHash('sha256').update(requestParam.body).digest('hex');
        
        const signResult = {
            'Host': requestParam.host,
            'X-Content-Sha256': xContentSha256,
            'X-Date': xDate,
            'Content-Type': requestParam.contentType
        };

        const signedHeaderStr = ['content-type', 'host', 'x-content-sha256', 'x-date'].join(';');
        const canonicalRequestStr = this.buildCanonicalRequest(requestParam, xContentSha256, xDate);
        
        const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequestStr).digest('hex');
        const credentialScope = [shortXDate, credential.region, credential.service, 'request'].join('/');
        const stringToSign = ['HMAC-SHA256', xDate, credentialScope, hashedCanonicalRequest].join('\n');
        
        let kDate = crypto.createHmac('sha256', credential.secretKeyId).update(shortXDate).digest();
        let kRegion = crypto.createHmac('sha256', kDate).update(credential.region).digest();
        let kService = crypto.createHmac('sha256', kRegion).update(credential.service).digest();
        let kSigning = crypto.createHmac('sha256', kService).update('request').digest();
        let signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
        
        signResult['Authorization'] = `HMAC-SHA256 Credential=${credential.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaderStr}, Signature=${signature}`;
        
        return signResult;
    }

    buildCanonicalRequest(requestParam, xContentSha256, xDate) {
        return [
            requestParam.method,
            requestParam.path,
            new URLSearchParams(requestParam.query).toString(),
            [
                `content-type:${requestParam.contentType}`,
                `host:${requestParam.host}`,
                `x-content-sha256:${xContentSha256}`,
                `x-date:${xDate}`
            ].join('\n'),
            '',
            'content-type;host;x-content-sha256;x-date',
            xContentSha256
        ].join('\n');
    }

    async request(method, query, header, action, body) {
        const credential = {
            accessKeyId: this.ak,
            secretKeyId: this.sk,
            service: this.service,
            region: this.region,
        };

        query = {
            ...query,
            Action: action,
            Version: this.version
        };
        
        const requestParam = {
            body,
            host: this.host,
            path: '/',
            method,
            contentType: this.contentType,
            date: new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),
            query
        };

        const signResult = this.calculateSignature(requestParam, credential);
        header = { ...header, ...signResult };

        try {
            const response = await axios({
                method: requestParam.method,
                url: `https://${requestParam.host}${requestParam.path}`,
                headers: header,
                params: requestParam.query,
                data: body,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async processImage(requestData = {}) {
        try {
            const requestBody = { ...this.defaultBody, ...requestData };
            const body = JSON.stringify(requestBody);
            
            return await this.request('POST', {}, {}, 'CVProcess', body);
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
}

export default VolcEngine;