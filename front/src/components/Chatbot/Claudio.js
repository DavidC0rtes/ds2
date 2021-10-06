import React from 'react'
import Chatbot from 'react-simple-chatbot'
import steps from './stepsDefinition'


const Claudio = () => {
	return (
		<Chatbot
			floating={true}
			hideUserAvatar={true}
			width={300}
			steps={steps}
			placeholder={"Escribe aquí."}
			headerTitle={"Chatea con Claudio"}
			contentStyle={{overflow: 'auto'}}
			customStyle={{overflow: 'auto', height: '100%'}}
		/>
	)
}

export default Claudio