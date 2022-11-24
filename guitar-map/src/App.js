import {useState} from 'react';
import Dropdown from 'react-dropdown';
import './App.css';

function App() {
  const [tuning, setTuning] = useState([
    {string: 'high-e', note: 'E'},
    {string: 'b', note: 'B'},
    {string: 'g', note: 'G'},
    {string: 'd', note: 'D'},
    {string: 'a', note: 'A'},
    {string: 'low-e', note: 'E'},
  ]);

  const [key, setKey] = useState('C')
  const [currentKey, setCurrentKey] = useState(['C', 'D', 'E', 'F', 'G', 'A', 'B'])


  let notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E' ,'F', 'F#', 'G', 'G#'];
  
  const noteVal = (note) => {
    return notes.indexOf(note);
  };
  
  const updateCurrentKey = (selectedKey) => {
    let indexes = [notes.indexOf(selectedKey.value)]
    indexes.push((indexes[0] + 2) % 12)
    indexes.push((indexes[0] + 4) % 12)
    indexes.push((indexes[0] + 5) % 12)
    indexes.push((indexes[0] + 7) % 12)
    indexes.push((indexes[0] + 9) % 12)
    indexes.push((indexes[0] + 11) % 12)
    indexes.push((indexes[0] + 12) % 12)
    let notesInKey = [];
    indexes.forEach(index => {
      notesInKey.push(notes[index])
    })
    console.log(notesInKey)
    setCurrentKey(notesInKey)
  }


  const changeTuning = (e, string) => {
    let copyTuning = JSON.parse(JSON.stringify(tuning));
    let changeString = copyTuning.findIndex((val => val.string == string))
    copyTuning[changeString].note = e.value
    setTuning(copyTuning)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: "flex"}}>
          {tuning.map(string => (
            <div>{string.note}</div>
          ))}
          <div class="currentKey">
            <Dropdown options={notes} onChange={updateCurrentKey} value={key}></Dropdown>
          </div>
        </div>
        <div style={{display: "flex", width: "100%"}}>
          <div id="tuning" className="tuning">
            {tuning.map(string => (
              <div
                id={string.string}
                className="tunedString"
                style={{backgroundColor: currentKey.includes(string.note) ? 'green' :'white'}}>
                <Dropdown
                  options={notes}
                  onChange={e => changeTuning(e, string.string)}
                  value={string.note}>
                </Dropdown>
              </div>
            ))}
          </div>
          <div id="fretboard" className="fretboard">
            <div id="black-bar" className="blackBar"></div>
            <div id="strings" className="stringDiv">
              {tuning.map(string => (
                <div className="string">
                  <div className="noteRow">
                    {notes.map(note => (
                      <div
                        className="note"
                        style={{backgroundColor: currentKey.includes(notes[(noteVal(string.note) + notes.indexOf(note) + 1) % 12]) ? 'green' :'blue'}}
                      >
                        {notes[(noteVal(string.note) + notes.indexOf(note) + 1) % 12]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div id="frets">
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
