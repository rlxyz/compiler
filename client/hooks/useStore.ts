import create from 'zustand'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
    web3: null,
    onboarded: false,
    userInteractions: null,
    progress: null,
  }
})

export default useStore
