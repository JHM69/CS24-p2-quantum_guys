import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import Button from '../common/Button'
import { Close } from '../common/icons/Close'
import { getBaseUrl } from '../../utils/url'
import axios from 'axios'
import StsForm from '../StsForm'
import toast, { Toaster } from 'react-hot-toast'
import { BiEdit, BiPencil } from 'react-icons/bi'
import { FaEdit, FaUserEdit } from 'react-icons/fa'
const UpdateSts = ({ sts,reload,setReload, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const onFormSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token')
      console.log("submitted sts",sts)
      await axios
        .put(getBaseUrl() + `/sts/${sts.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            // alert('Successfully Updated.')
            toast.success('STS added successfully')
            handleClose()
          }
          else if(res.status === 200){
            toast.success('STS updated successfully')
            handleClose()
          } else {
            alert(res.status)
            console.log(res)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        onClick={handleOpen}
        className="smooth-effect m-3 rounded bg-green-300 p-2 text-green-800 shadow hover:bg-green-400"
      >
        <BiPencil {...props} />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-y-auto rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800"
                  >
                    <h3>Update STS</h3>
                    <Close onClick={handleClose} />
                  </Dialog.Title>

                  <StsForm
                    defaultValues={sts}
                    type={'Update'}
                    onFormSubmit={onFormSubmit}
                    handleClose={handleClose}
                    reload={reload}
                    setReload={setReload}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateSts
