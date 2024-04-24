import React, {useState, useCallback, useEffect} from 'react';

function App() {
      const bgColor = ("rgb(10 38 75 / 85%)");
      const color = ("rgb(255 205 0)");

      const [length, setLength] = useState(8);
      const [numberAllow, setNumberAllow] = useState(false);
      const [charecterAllow, setCharecterAllow] = useState(false);
      const [password, setPassword] = useState("");

      const passwordGenerator = useCallback(() => {
            let pass = '';
            let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            if (numberAllow) {
                  char = char + '0123456789';
            } else if (charecterAllow) {
                  char = char + '!@#$%^&*()_-;?,~++{}[]<>';
            }

            for (let i = 1; i <= length; i++) {
                  let str = Math.floor(Math.random() * char.length + 1);
                  pass = pass + char.charAt(str);
            }

            setPassword(pass);

      }, [length, numberAllow, charecterAllow, setPassword]);

      useEffect(() => {
            passwordGenerator();
      }, [length, numberAllow, charecterAllow, passwordGenerator]);

      const passwordCopy = () => {
            let text = document.getElementById('passText');
            text.select();
            navigator.clipboard.writeText(text.value);
      }

      return (
            <div className='w-full h-screen flex flex-wrap justify-center items-center'>
                  <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 my-8' style={{ backgroundColor: bgColor }}>
                        <h1 className='text-4xl text-center font-bold my-5' style={{ color: color }}>Password Generator</h1>
                        <div className='flex flex-wrap overflow-hidden text-orange-500 my-4 '> {/*tracking-wider*/}
                              <input type="text" className='my-3 w-9/12 h-10 rounded-l-lg outline-none px-3 font-semibold text-lg' readOnly placeholder='Password' id='passText' value={password} />
                              <button type="button" className='my-3 w-3/12 h-10 rounded-r-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 outline-none text-xl font-semibold text-white select-none' onClick={passwordCopy}>Copy</button>
                        </div>
                        <div className='flex flex-wrap gap-x-4 text-lg mb-5 pb-3 justify-center'>
                              <div className="flex items-center gap-x-1 text-white">
                                    <input className='cursor-pointer' type="range" id="length" value={length} min={8} max={99} onChange={(e) => {setLength(e.target.value);}} />
                                    <label className='cursor-pointer' htmlFor='length'>Length : {length}</label>
                              </div>
                              <div className="flex items-center gap-x-1 text-white">
                                    <input className='cursor-pointer' type="checkbox" id="number" defaultChecked={numberAllow} onChange={() => {setNumberAllow(prev => !prev);}} />
                                    <label className='cursor-pointer' htmlFor='number'>Number</label>
                              </div>
                              <div className="flex items-center gap-x-1 text-white">
                                    <input className='cursor-pointer' type="checkbox" id="spChar"  defaultChecked={charecterAllow} onChange={() =>{setCharecterAllow(prev => !prev);}} />
                                    <label className='cursor-pointer' htmlFor='spChar'>Special Charecter</label>
                              </div>
                        </div>
                        <div className='flex flex-wrap gap-x-4 text-lg mb-5 pb-3 justify-center'>
                              <button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-xl font-semibold text-white select-none px-3 py-2 rounded-lg' onClick={passwordGenerator}>Generate Password</button>
                        </div>
                  </div>
            </div>
      )
}

export default App
