import { Connection, Channel, connect } from 'amqplib'
import notify from '~/helpers/notify' 

class RabbitMQServer {
    private conn!: Connection

    private channel!: Channel

    private url!: string

    constructor() {
        this.url = process.env.RABBIT_HOST!
    }

    async start(): Promise<void> {
        this.conn = await connect(this.url)
        this.channel = await this.conn.createChannel()
    }

    async receiveInQueue(queue: string) {
        this.channel.assertQueue(queue, {
            durable: false,
        })
        this.channel.consume(queue, (msg: any) => {
            console.log("[X] Received %s", msg.content.toString());
            let message = JSON.parse(msg.content.toString())
            console.log(message)
 
            notify(message)
        }, {
            noAck: true
        })
    }
}

export default RabbitMQServer