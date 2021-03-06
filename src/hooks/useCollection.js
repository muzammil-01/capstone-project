import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useCollection = (collection, _query) => {
  const {user} = useAuthContext();
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)
    if(user){

      if (query) {
        ref = ref.where(...query)
      }
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        console.log(doc)
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, query,user])

  return { documents, error }
}