import React from 'react'
import Chatbot from 'react-simple-chatbot'
import steps from './stepsDefinition'


const Claudio = () => {
	return (
		<Chatbot
			floating={true}
			steps={steps}
		/>
	)
}

export default Claudio