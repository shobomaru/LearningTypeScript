/**
 * Message class
 */
export class Message
{
    /**
     * Constructor
     */
    constructor(private message: string)
    {
    }

    /** Output message */
    public sayMessage()
    {
        console.log(this.message);
    }

    /** Get message */
    public getMessage()
    {
        return this.message;
    }
}
