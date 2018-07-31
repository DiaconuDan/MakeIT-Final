export class MessageModel{
    id: string;
    text: string;
    userId : string;
    date : string;
}
export class PrivateMessageModel{
    id: string;
    text: string;
    userId : string;
    date : string;
    senderId : string;
}