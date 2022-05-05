import React, { FC, ReactElement, useEffect, useState } from 'react';
import logo from './logo.svg';
import { WhoopApi } from '../lib/whoopApi';
import { create } from 'domain';

const Dashboard = (): ReactElement => {
  const [apiHandler, setApiHandler] = useState<WhoopApi | undefined>(undefined);
  const [covid, setCovid] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createApiHandler = async (username: string, password: string) => {
    const api = await WhoopApi.makeWhoopApi(username, password);
    setApiHandler(api);
  }

  return (
    <div className="App">
      <p>WHOOP Username</p>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" onChange={e => setUsername(e.target.value)} />
        <p>WHOOP Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={() => createApiHandler(username, password)}>Log In</button>
      </form>
      <p>{'Logged In: ' + (apiHandler ? true : false).toString()}</p>
      <button onClick={async () => {
          const results = apiHandler && await apiHandler.getCycles(new Date(2022, 4, 4), new Date());
          setCovid(results?.records[0].recovery.prob_covid ?? 0);
        }}>Click here for probability covid.</button>
      <p>{covid}</p>
    </div>
  );
}

export default Dashboard;
