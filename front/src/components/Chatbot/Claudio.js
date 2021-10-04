import React from 'react'
import Chatbot from 'react-simple-chatbot'
import steps from './stepsDefinition'


const Claudio = () => {
	return (
		<Chatbot
			floating={true}
			width={300}
			steps={steps}
			placeholder={"Escribe aquí."}
			headerTitle={"Chatea con Claudio"}
		/>
	)
}

export default Claudio