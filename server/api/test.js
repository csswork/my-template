import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET':
      return {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      }

    case 'POST':
      const body = await readBody(event)
      return {
        message: 'Item created',
        data: body
      }

    default:
      return { error: 'Method not allowed' }
  }
})