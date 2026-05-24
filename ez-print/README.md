# EZPrint Repo 
## Dependencies
Before proceeding to the following make sure you have node.js installed if you dont you can download it here
<a>https://nodejs.org/en/download</a>
### React App setup and package/API installs
Enter to preferred project folder and then open terminal
Enter the following commands one by one in order
```
git clone https://github.com/Ilethami/Expo-EZPrint.git
```
Then enter react app folder /Project-Folder/Expo-EZPrint/EZ-Map and open the integrated terminal
run
```
| npm i
```
If vulnerabilities are encountered  run
``` npm audit fix ```
<br>
After run this command
```
| npm run dev
```
If you have the backend (refer to <a>https://github.com/zac4312/Web-Print_JS-Integration</a> and <a>https://github.com/zac4312/Web-Print_API</a>)
then run in React App(EZ-Map) terminal
```
| npm run build
```
Then copy the contents of dist folder inside the react app and paste it into Disk\xampp\htdocs\foldername
If you change contents in the react app run ``` npm run build``` again and replace what exists in the xampp/htdocs/filename

*For the time being these are only instructions to run the Web App, Backend is gatekept
P.S Ilethami*

