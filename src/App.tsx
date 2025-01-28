import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;