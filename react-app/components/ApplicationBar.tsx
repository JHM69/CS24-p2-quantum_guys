import * as React from 'react'

import { IoIosMenu } from 'react-icons/io'
import { useEffect } from 'react'
import BellNotification from './notifications/BellNotification'
import SearchBox from './search/SearchBox'
import { SettingsModal } from './sidebar/profile/SettingsModal'
import SwitchLanguage from './common/SwitchLanguage'
/**
 * The top bar of the application, with the model and purpose selection, and menu/settings icons
 */

const ApplicationBar: React.FC<{
  activeTabPageId: string
  isSidebarOpen: boolean
  toggleSidebar: () => void
}> = ({ isSidebarOpen, toggleSidebar, activeTabPageId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const [user, setUser] = React.useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <>
      {/* Top Bar with 2 icons and Model/Purpose selectors */}
      <div className="sticky top-0 z-10 w-full md:z-10 ">
        <div className="flex h-16 w-full flex-row items-center justify-between border-b border-green-500 border-opacity-100 bg-white">
          <button
            onClick={toggleSidebar}
            className={`absolute z-30 h-14 w-14 text-white transition hover:opacity-75 ${
              !isSidebarOpen ? 'block' : 'md:hidden'
            }`}
          >
            <IoIosMenu className="mx-auto my-auto h-6 w-6" />
          </button>

          {/* search box  */}
          <div className="w-9/12 md:w-6/12">
            <SearchBox />
          </div>

          {/* user photo showing  */}

          <div className="flex items-center justify-between">
            <>
              <BellNotification />
              <SwitchLanguage />
              <a
                onClick={toggleModal}
                className="smooth-effect mr-5 flex flex-row items-center px-3 py-1 text-black hover:text-green-500"
              >
                <img
                  className="inline-block h-[50px] w-[50px] cursor-pointer rounded-full"
                  src={user?.image || '/logo.png'}
                  alt="avatar"
                  width={40}
                  height={40}
                />

                <div className="mx-2 flex flex-col justify-center">
                  <span className="text-[14px] font-bold">{user?.name}</span>
                  <span className="rounded-xl bg-red-500 text-center text-[11px] font-bold text-white">
                    {user?.role?.type}
                  </span>
                </div>
              </a>
            </>
          </div>

          {/* bg for close modal  */}
          <SettingsModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={user}
          />
          {isModalOpen && (
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed z-40 h-screen w-screen"
            ></div>
          )}
        </div>
      </div>
    </>
  )
}
export default ApplicationBar
