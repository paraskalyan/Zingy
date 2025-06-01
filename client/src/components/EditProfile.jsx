import { Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import React from 'react'

const EditProfile = ({ openModal, setOpenModal }) => {

    return (
        <div>
            <Modal root={{ "show": { "on": 'bg-white' } }} show={openModal} onClose={() => setOpenModal(false)} >
                <ModalHeader>
                    Edit your Profile
                </ModalHeader>
                <ModalBody>
                    <TextInput />
                    <TextInput />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditProfile