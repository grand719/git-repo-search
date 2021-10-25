import React, { useState, useCallback, useRef } from 'react';
import useQuery from './hooks/useQuery';

import './App.css'

import { Repository } from './components/Repository';
import { RepositoryForm } from './components/RepositoryForm';


function App(){
  const [params, setParams] = useState({repoName: '', reposNumber: 10})
  const {repos, loading, error} = useQuery(params)
  const [isMore, setIsMore] = useState(true)

  const searchRepo = (repoName: string) => {
    setParams({reposNumber: 10, repoName: repoName})
  }
  const observer: any = useRef(null)

  const lastRepoRef = useCallback( node => {
      if(loading) return 
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && params.reposNumber <= 100) {
          setParams({...params, reposNumber: params.reposNumber + 10})
          console.log(repos.length)
        }
      })
      if(node) observer.current.observe(node)
  }, [loading, isMore])


  return (
    <div className="App">
      <h1>GitHub Repository</h1>

      <RepositoryForm onSearchChange = {searchRepo} />
       {error && <h1>Error</h1>}
       {repos.length === 0 && <h2>No repositories found</h2>}
       {repos.map((repoE: any, index: number) => {
        if(repos.length === index+ 1) {
          return <Repository innerRef={lastRepoRef} key={repoE.repo.id} {...repoE.repo} />
        }else {

          return <Repository key={repoE.repo.id} {...repoE.repo} />
        }
       })}
       {loading && <h1>Loading...</h1> }
    </div>
  );
}

export default App;
