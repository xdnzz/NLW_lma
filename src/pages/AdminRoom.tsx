import {useHistory, useParams} from 'react-router-dom'
//import {database} from '../services/firebase'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
//import { useState, FormEvent, useEffect} from 'react'
//import {useAuth} from '../hooks/useAuth'
import {useRoom} from '../hooks/useRoom'
import {Question} from '../components/Question/index'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

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

    //const {user} = useAuth();
    const history = useHistory()
    const params = useParams<RoomParams>();

    const roomId = params.id;
    const {title, question} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()

        })
        history.push('/')
        
    }


    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que você deseja exluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
            
        }
    }

    async function handleCHeckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
            
        })
    }

    async function handleHighLightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true
            
        })
    }

     
return (
   <div id="page-room">
       <header>
           <div className="content">
               <img src={LogoImg} alt="letmeask"/>
               <div>
               <RoomCode code={roomId}/>
               <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
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
                             isAnswered={question.isAnswered}
                             isHighLighted={question.isHighLighted}
                             >
                                  {!question.isAnswered && (
                                      <>
                                <button type="button"
                                 onClick={()=> handleCHeckQuestionAsAnswered(question.id)}
                                 >
                                     <img src={checkImg} alt="Marcar pergunta como respondida"/>
                                 </button>
                                 <button type="button"
                                 onClick={()=> handleHighLightQuestion(question.id)}
                                 >
                                     <img src={answerImg} alt="Dar destaque a pergunta"/>
                                 </button>
                               
                                      </>
                                  )}
                                    <button type="button"
                                 onClick={()=> handleDeleteQuestion(question.id)}
                                 >
                                     <img src={deleteImg} alt="Remover pergunta"/>
                                 </button>
                             </Question> 
                                        )
                     })}
                    </div>
                </main>
           </div>

       
   
)
}