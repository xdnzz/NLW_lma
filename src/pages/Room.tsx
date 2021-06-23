import {useParams} from 'react-router-dom'
import {database} from '../services/firebase'
import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useState, FormEvent} from 'react'
import {useAuth} from '../hooks/useAuth'


type RoomParams = {
    id: string; 
}


export function Room(){

const {user} = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('')
const roomId = params.id;

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
               <RoomCode code={roomId}/>
            </div>
       </header>

       <main >
           <div className="room-title">
                <h1>Sala React</h1>
                <span>4 Perguntas</span> </div>

                <form onSubmit={handleSendQuestion}>
                <textarea 
                    placeholder="O que você quer saber?"
                    onChange={event=>setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />  

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
                </main>
           </div>

       
   
)
}