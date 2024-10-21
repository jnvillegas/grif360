import {gapi} from 'gapi-script';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

  /**
   * Print files.
   */

export class GoogleApi {
    

    constructor(setUsuarioActivo){
        handleClientLoad();
        this.setUsuarioActivo = setUsuarioActivo;
    }

    async logIn(){
        let a = await gapi.auth2.getAuthInstance().signIn(); 
        let user = {...gapi.auth2.getAuthInstance().currentUser, home: await listFiles()}
        localStorage.setItem('user', JSON.stringify(user));
        this.setUsuarioActivo(user);

        //window.location.reload();
    }

    getGapi(){
      return gapi;
    }

    logOut(){
        gapi.auth2.getAuthInstance().signOut();
        localStorage.removeItem('user');
        this.setUsuarioActivo(null);
        //window.location.reload();

    }

    async getExperiencias(folderId){
      var archivos = [];      

      await gapi.client.drive.files.list({
          corpora: 'allDrives',
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
          q: `'${folderId}' in parents and trashed=false and name contains '.grf'`,

      }).then(x => archivos = x.result.files);      
      
      return archivos;
      
  }

  static async getFileById(fileId){
    let proyecto = null;
    await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    }).then(f => {
      proyecto =  {...f.result, id:fileId}}
    );
   
    return proyecto;
  }

    // async getExperiencias(folderId){
    //     var archivos = [];
    //     var experiencias = [];

    //     await gapi.client.drive.files.list({
    //         corpora: 'allDrives',
    //         includeItemsFromAllDrives: true,
    //         supportsAllDrives: true,
    //         q: `'${folderId}' in parents and trashed=false and name contains '.grf'`,

    //     }).then(x => archivos = x.result.files);
    //     console.log(archivos)
    //     console.log(archivos.map(a => a.id))
        
    //     for (let i=0; i<archivos.length; i++){
          
    //         console.log('indice:',i) 
    //         console.log(archivos[i]);
            
    //         await gapi.client.drive.files.get({
    //           fileId: archivos[i].id,
    //           alt: 'media'
    //         })
    //         .then(f => experiencias.push({...f.result, id:archivos[i].id}))
          
          
    //     }
        
    //     return experiencias;
        
    // }

    async deleteFile(id){
      return gapi.client.drive.files.delete({
        'fileId': id
      })
    }


    async renameFile(id, newName){
     
      const usuario = JSON.parse(localStorage.getItem('user'));     
      const token = usuario.c2.value.xc.access_token;
     
      try {
        
        const url_rename = `https://www.googleapis.com/drive/v3/files/${id}`;
        const body = JSON.stringify({
          'name': newName + "-" + Date.now() + ".grf"
        });
        
        const response = await fetch(url_rename, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: body
        });
        if(!response.ok){
          throw new Error("Error al renombrar archivo");
        }
        const data = await response.json();        

        return data;
        
      } catch (error) {
        throw new Error(error);
      }

    }

    async createFile(name, folderId, contenido, fileId=null){
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const contentType = 'application/json';
        var metadata = {
                        'name': name,
                        'mimeType': contentType,
                        parents: [folderId],
                       };
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
            JSON.stringify(contenido) +            
            close_delim;

        var request = gapi.client.request({
              'path': fileId?'/upload/drive/v3/files/'+fileId:'/upload/drive/v3/files/',
              'method': fileId?'PATCH':'POST',
              'params': {resource: {
                name: name,
                parents: [folderId],
                mimeType: contentType,  
                
            },
            fields: 'id',
            'uploadType': 'multipart'},
              'headers': {
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});          
          let newId = await request;
          let respuesta = JSON.parse(newId.body)
          return newId;
    
    }

    async setReadPermission(fileId){
      var request = gapi.client.request({
        'path': `drive/v3/files/${fileId}/permissions`,
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({
            role: 'reader', // Rol del usuario (puedes usar 'reader', 'writer', 'commenter')
            type: 'anyone',                    
        }),
        });
      return await request.execute((e) => console.log('permisos', e) );
    }

    async saveFile(contenido, fileId){
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const contentType = 'application/json';
      var metadata = {
                      'mimeType': contentType,
                     };
      var multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n\r\n' +
          JSON.stringify(contenido) +            
          close_delim;

      var request = gapi.client.request({
            'path': '/upload/drive/v3/files/'+fileId,
            'method': 'PATCH',
            'params': {resource: {
              mimeType: contentType,  
              
          },
          fields: 'id',
          'uploadType': 'multipart'},
            'headers': {
                  'Content-Type': 'multipart/related; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});
            
      return await request;

      

      /*return await gapi.client.drive.files.create({
          resource: {
              name: name,
              parents: [folderId],
              mimeType: '* / *',  
              
          },
          fields: 'id',
          uploadType:'media'
      }) */
  }

    async saveImage(name, folder, content){

        const contentType = 'image/jpeg';
        var metadata = {
                        'name': name,
                        'mimeType': contentType,
                        parents: [folder],
                       };


        var request = gapi.client.request({
              'path': '/upload/drive/v3/files?uploadType=media',
              'method': 'POST',
              'params': {resource: {
                name: name,
                parents: [folder],
                mimeType: 'image/jpeg',  
                
            },
            fields: 'id',
            uploadType: 'media'},
              'headers': {
                    'Content-Type': 'image/jpeg'
              },
              'body': content});
        return await request.execute((e) => console.log(e) );
    }

    listFiles(){
      return listFiles();
    }

}

  const setSignedInUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    //window.location.reload();
  }

  const listFiles = async (searchTerm = null) => {   
    var griftinFolderId = ''; 
    await gapi.client.drive.files
      .list({        
        //fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        q: "name = 'Griftin360' and trashed=false",
      })
      .then(function (response) {                
        const res = JSON.parse(response.body); 
        console.log('folders', res.files);
        griftinFolderId = res.files[0]??null;
        if (!griftinFolderId)
            gapi.client.drive.files.create({
                resource: {
                    name: 'Griftin360',
                    mimeType: 'application/vnd.google-apps.folder',
                },
                fields: 'id',
            }).then(x => console.log(x))        
      });

      return griftinFolderId;
  };

  /**
   *  Sign in the user upon button click.
   */
 
  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = async (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      /*let user = {...gapi.auth2.getAuthInstance().currentUser, home: await listFiles()}
      setSignedInUser(user);*/
      
      // list files if user is authenticated
      
    } /*else {
      // prompt user to sign in
      handleAuthClick();
    }*/
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {}
      );
  };

 export const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
    return gapi;
 };

 export const handleClientExit = () => {
    gapi.auth2.getAuthInstance().signOut();
    localStorage.removeItem('user')
 }

