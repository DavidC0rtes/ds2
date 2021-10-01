/**
 * Antes de leer este archivo tenga en cuenta que
 * los formularios dentro de un dialog son un
 * antipatrón :(
 */
import React from 'react'
import AlertDialog from "./AlertDialog";
import FormChangeRole from 'components/Forms/FormChangeRole';

const btnStyle = {
	backgroundColor: '#8b0000',
	color: 'white',
	'&:hover': {
		backgroundColor: 'black'
	},
	margin: '0 auto',
	width: '100%'
}


const ChangeRole = ({currentRole}) => {
	return (
		<AlertDialog
			btnTxt={"Cambiar rol"}
			title={"¿Está seguro? Esta acción es definitiva."}
			message={"Seleccione el nuevo rol"}
			agreeTxt={"Sí"}
			disagreeTxt={"No"}
			btnStyle={btnStyle}
			form={<FormChangeRole currentRole={currentRole} />}
		/>
	)
}

export default ChangeRole