import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Decoder } from './pages/Decoder';
import { Thermometer } from './pages/Thermometer';
import { TurnTables } from './pages/TurnTables';
import { SmartBehaviors } from './pages/SmartBehaviors';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/decoder" element={<Decoder />} />
        <Route path="/thermometer" element={<Thermometer />} />
        <Route path="/turntables" element={<TurnTables />} />
        <Route path="/behaviors" element={<SmartBehaviors />} />
      </Routes>
    </HashRouter>
  );
};

export default App;