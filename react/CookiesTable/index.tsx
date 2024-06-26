import React, { FC, useState } from 'react'
import {
  Table,
  Spinner,
  Input,
  Button,
  ButtonWithIcon,
  IconDelete
} from 'vtex.styleguide'
import { useQuery, useMutation } from 'react-apollo'
import { pathOr } from 'ramda'
import PHRASES from '../graphql/getPhrases.graphql'
import ADD_PHRASE from '../graphql/addNewPhrase.graphql'
import DELETE_PHRASE from '../graphql/deletePhrase.graphql'
import { phrasesSerializer } from '../utils/serializer'

const CookiesTable: FC = () => {
  const [newPhrase, setNewPhrase] = useState<string>('')

  const { data: phrasesData, refetch  } = useQuery(PHRASES, {
    variables: {
      acronym: 'CF',
      fields: 'CookieFortune',
      pageSize: 100
    },
    fetchPolicy: 'no-cache'
  })

  const phrases = phrasesSerializer(pathOr([], ["documents"], phrasesData))

  const [addNewPhrase] = useMutation(ADD_PHRASE, {
    onCompleted: () => refetch()
  })
  const [deletePhrase] = useMutation(DELETE_PHRASE, {
    onCompleted: () => refetch()
  })

  const addPhrase = () => {
    if (newPhrase) {
      addNewPhrase({
        variables: {
          acronym: 'CF',
          document: {
            fields: [
              { key: 'CookieFortune', value: newPhrase }
            ]
          }
        },
        fetchPolicy: 'no-cache'
      })
      setNewPhrase('')
      location.reload()
    }
  }

  const deleteCookieHandler = (documentId: string) => {
    deletePhrase({
      variables: {
        acronym: 'CF',
        documentId
      },
      fetchPolicy: 'no-cache'
    })
  }

  const cookiesSchema = {
    properties: {
      name: {
        title: 'Phrase'
      },
      actions: {
        title: 'Actions',
        width: 75,
        cellRenderer: ({ rowData }: { rowData: any }) => {
          return (
            <ButtonWithIcon icon={<IconDelete />} variation="danger" onClick={() => deleteCookieHandler(rowData.id)} />
          )
        },
      }
    }
  }

  return (
    <>
      <div className='cookies-admin--options'>
        <Input label='Agregar nueva frase de la fortuna' placeholder='Experience is the best teacher...' value={newPhrase} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhrase(e.target.value)} />
        <Button variation='primary' onClick={addPhrase} >Agregar</Button>
      </div>
      {phrases && phrases !== null ? (
        <Table schema={cookiesSchema}
          items={phrases?.map(item => ({ name: item.CookieFortune, id: item.id }))} fullWidth={true} />
      ) : (<Spinner />)}
    </>
  )
}

export default CookiesTable
