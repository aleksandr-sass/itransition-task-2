const fs = require('fs');
const { SHA3 }=require('sha3');
const hash = new SHA3(256);

module.exports=async (path)=>
{
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir)
  {
    let direntPath=dir.path+"\\"+dirent.name;      
    if(dirent.isFile())
    {
      let f=fs.readFileSync(direntPath);
      hash.update(f);
      console.log(dirent.name+" "+hash.digest('hex'));
      hash.reset();
    }
  }
}