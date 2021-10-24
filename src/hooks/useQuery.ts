import { useReducer, useEffect } from "react";
import { client } from "../github_gql_clinet/gql_client";
import {getRepos} from '../query/getRepos'



enum ACTIONS {
    MAKE_REQUEST = 'MAKE-REQUEST',
    GET_DATA = 'GET-DATA',
    ERROR = "ERROR",
}

type Action = {
    type: ACTIONS,
    value?: {
        error?: string,
        repos?: [],
    }
}

const defaultState = {
    loading: false,
    error: "",
    repos: []
}

function reducer(state: any = defaultState, action: Action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {...state, loading: true}
        case ACTIONS.GET_DATA:
            return {...state, loading: false, repos: action.value!.repos}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.value!.error}
    }
}

export default function useQuery(params: {repoName: string, reposNumber: number}) {
    const [state, dispatch] = useReducer(reducer, {repos: [], loading: true}) 

    useEffect(() => {
    dispatch({type: ACTIONS.MAKE_REQUEST})
       client.query({
            query: getRepos,
            variables: {
                repoName: params.repoName,
                repoFirst: params.reposNumber
            }
        }).then((res) => {
            dispatch({type: ACTIONS.GET_DATA, value: {
                repos: res.data.search.repos
            }})

        }).catch((e)=> {
            dispatch({type: ACTIONS.ERROR, value: {
                error: "error"
            }})
        })
    
    }, [params])

    return state;
}