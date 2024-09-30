import dotenv from 'dotenv'
dotenv.config()

import app from './src/app';


// run server
const PORT: number = Number(process.env.PORT) || 3000;


// try {
//     await app.listen({ port: PORT })
// } catch (err) {
//   app.log.error(err)
//   process.exit(1)
// }

const main = async () => {
    try {
        await app.listen({
            port: PORT
        });
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

// graceful, demure shutdown
["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
        await app.close();

        process.exit(0);
    })
})

main()