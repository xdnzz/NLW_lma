import {useParams} from 'react-router-dom'
import {database} from '../services/firebase'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useState, FormEvent, useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import {useRoom} from '../hooks/useRoom'
import {Question} from '../components/Question/index'


type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>


type RoomParams = {
    id: string; 
}



type Question = {
    id: string;
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}


export function AdminRoom(){

    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id;
    const {title, question} = useRoom(roomId)

 






async function handleSendQuestion(event: FormEvent){
    event.preventDefault()
if(newQuestion.trim()===''){
    return;
}

if(!user) {
    throw new Error('You must be logged in')
}

const question = {
    content: newQuestion,
    author:  {
        name: user?.name,
        avatar: user.avatar,
    },
    
    isHighLighted: false,
    isAnswered: false
};

await database.ref(`/rooms/${roomId}/questions`).push(question)

setNewQuestion('')


}



     
return (
   <div id="page-room">
       <header>
           <div className="content">
               <img src={LogoImg} alt="letmeask"/>
               <div>
               <RoomCode code={roomId}/>
               <Button isOutlined>Encerrar Sala</Button>
             </div>
            </div>
       </header>

       <main >
           <div className="room-title">
                <h1>Sala: {title}</h1>
                {question.length > 0 && <span>{question .length} Pergunta(s)</span>} </div>



                    <div className="question-list">
                    {question.map(question => {
                    return(
                             <Question 
                             key={question.id}
                             content={question.content}
                             author={question.author}
                             />
                                        )
                     })}
                    </div>
                </main>
           </div>

       
   
)
}