import { useState, useEffect } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const DarkModeToggle = () => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
      // Load mode preference from local storage on initial render
      const savedMode = localStorage.getItem('mode');
      setMode(savedMode || 'light');
    }, []);
  
    const toggleDarkMode = () => {
      // Toggle mode state and update the local storage
      const updatedMode = mode === 'light' ? 'dark' : 'light';
      setMode(updatedMode);
      localStorage.setItem('mode', updatedMode);
  
      // Apply changes to the class name of the <html> element
      const htmlElement = document.getElementsByTagName('html')[0];
      htmlElement.classList.toggle('dark', updatedMode === 'dark');
	};

	return (
		<div>
			<button onClick={toggleDarkMode}>
				{mode === 'light' ? (
					<BsMoonFill className='w-5 h-5 dark:fill-[#001440] fill-[#001440] hover:scale-110 mt-2 mr-2'/>
				) : (
					<BsSunFill className='w-5 h-5 mt-2 mr-2 hover:scale-110 fill-[#001440] dark:fill-gray-400'/>
				)}
			</button>
		</div>
	);
};

export default DarkModeToggle;