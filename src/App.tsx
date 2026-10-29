import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import DisenaEvento from './pages/DisenaEvento'
import Eventos from './pages/Eventos'
import Inicio from './pages/Inicio'
import NoEncontrada from './pages/NoEncontrada'
import Ramo from './pages/Ramo'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/ramo/:id" element={<Ramo />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/disena" element={<DisenaEvento />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </Layout>
  )
}
