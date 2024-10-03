// import { createServer } from 'node:http'

//  const server = createServer ((request, response) => {
//     response.write('eai papa')

//     return response.end()
//  })

//  server.listen(3333) 

// import {DataBaseMemory} from "./database-memory.js"

    import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

        const server = fastify()

        // const database = new DataBaseMemory()

    const database = new DataBasePostgres

        server.post('/videos', async (request, reply) => {                        //upload de video
            const { title, description, duration } = request.body
        
            await database.create({ 
                title,
                description,
                duration,
            })     

            return reply.status(201).send()
        })

        server.get('/videos', async (request) => {          //buscar informação
            const search = request.query.search
            
            const videos = await database.list(search)

            return videos
        })

        server.put('/videos/:id', async(request, reply) => {      //atualizar o video
            const videoId = request.params.id
            const { title, description, duration } = request.body

            await database.update(videoId, {
                title,
                description,
                duration,
            })

            return reply.status(204).send()
        })

        server.delete('/videos/:id', async (request, reply) => {      //deletar o video
            const videoId = request.params.id 

            await database.delete(videoId)

            return reply.status(204).send()

        })


    server.listen({
        port: process.env.PORT ?? 3333, 
    })
