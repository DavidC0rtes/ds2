import React from 'react'
import Chatbot from 'react-simple-chatbot'
import steps from './stepsDefinition'


const Claudio = () => {
	return (
		<Chatbot
			floating={true}
			hideUserAvatar={true}
			contentStyle={{height: '100%'}}
			width={300}
			steps={steps}
			placeholder={"Escribe aquí."}
			headerTitle={"Chatea con Claudio"}
		/>
	)
}

export default Claudio