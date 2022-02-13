import { CardContent, CardHeader } from "@material-ui/core";
import { Container } from "@mui/material";
import "./App.css";
import AppNavBar from "./components/app-nav-bar";
import WordCounter from "./components/word-counter-component";

function App() {
  return (
    <Container>
        <AppNavBar />
      <CardContent>
        <WordCounter></WordCounter>
      </CardContent>
    </Container>
  );
}

export default App;
