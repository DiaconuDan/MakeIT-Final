import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageModel, PrivateMessageModel } from './../_models/message.model';

import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
    chatMessagesList : AngularFireList<any>;
    privateChatMessageList : AngularFireList<any>;
    constructor(public db: AngularFirestore,
                private firebase: AngularFireDatabase,
                public afAuth: AngularFireAuth) {}

    getGlobalChatMessages() {
        this.chatMessagesList = this.firebase.list('messages/global');
        return this.chatMessagesList;
    }
    getPrivateChatMessages(senderId) {
        this.chatMessagesList = this.firebase.list('messages/conversations', ref => ref.orderByChild('senderId').equalTo(senderId));
        return this.chatMessagesList;
    }
    addMessageGlobalChat(messsage:MessageModel){
        this.chatMessagesList.push(messsage);
    }
    addMessagePrivateConv(message:PrivateMessageModel){
        this.firebase.list('messages/conversations').push(message);
    }



}
