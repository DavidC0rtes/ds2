import React from 'react'
import Chatbot from 'react-simple-chatbot'
import steps from './stepsDefinition'
import { ThemeProvider } from 'styled-components'

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Roboto',
    headerBgColor: '#8b0000',
    headerFontSize: '30px',
    headerFontColor: '#fff',
    botFontColor: '#fff',
    userBubbleColor: '#8b0000',
    userFontColor: '#fff',
    botBubbleColor: '#8b0000'
}

const Claudio = () => {
	
	return (
        <ThemeProvider theme={theme}>
		<Chatbot
			className={"claudio"}
			floating={true}
            botAvatar={"https://i.postimg.cc/yNpPwzwg/pollo-logo-1.png"}
            //floatingStyle={{backgroundColor: '#e62e31'}}
            bubbleStyle={{fontSize: '14px', fontWeight: 'bolder'}}
            //bubbleOptionStyle={{backgroundColor: '#8b0000', color: '#fff'}}
			hideUserAvatar={true}
			width={300}
			steps={steps}
			placeholder={"Escribe aquí."}
			headerTitle={"Chatea con Claudio"}
			contentStyle={{overflow: 'auto'}}
			customStyle={{overflow: 'auto', height: '100%'}}
		/>
        </ThemeProvider>
	)
}

export default Claudio
