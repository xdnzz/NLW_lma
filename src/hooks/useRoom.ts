import {useState, useEffect} from 'react'
import { database } from '../services/firebase'




type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>


type QuestionType = {
    id: string;
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}



export function useRoom(roomId: string){
    const [question, setQuestion] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')


    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)
        
        roomRef.on('value', room =>{
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
        
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestion(parsedQuestions)
        
        })
        },[roomId]);

return (
    {question, title}
)

}