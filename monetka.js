let rnd = Math.floor(Math.random()*(2))+1 // случайное число
let flag = 0

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
if(argv._[0] == undefined) throw new Error("не введён обязательный параметр с именем файла-лога");

const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, String(argv._[0]));

const { rawListeners } = require('process')
const readline = require('readline')
const input = readline.createInterface(process.stdin)

console.log("ИГРА МОНЕТКА \nи - игра, с - вывод статистики, в - выход")

input.on('line', (data) =>
{
    if (data=='и') {
        flag=1
        console.log("Играем")
        console.log("Угадайте случайное число от 1 до 2:")
    }

    if (data=='с') {
        flag=3
        console.log("Вывод статистики")
        console.log("1 - количество партий, 2 - количество верных ответов, 3 - количество неверных ответов, 4 - процент верных ответов")
    }

    if (data=='в') {
        console.clear()
        input.close()
        fs.unlink(file, (err) => {
                if (err) console.log('нет лог-файла с результатом');
                else console.log('результат игры удалены');
            })
    }

if (flag==1){
    if (data==1 || data==2) {
        let content = (data==rnd) ? "+" : "-"
                        if (content=='+'){
                            console.log("ВЕРНО")
                        }
                        if (content=='-'){
                            console.log("НЕВЕРНО")
                        }    
        fs.appendFile(file, content, (err) => {
            if (err) throw new Error(err);
        })
    }
}

//статистика
    if (data==1 && flag==3) {
        fs.readFile(file,'utf-8',(err, data) => {
            if (err) console.log('нет лог-файла с результатом');
            else console.log("проведено " + data.length + " игр");
        });
    }  
    if (data==2 && flag==3) {
        fs.readFile(file,'utf-8',(err, data) => {
            if (err) console.log('нет лог-файла с результатом');
            else {
                let temp = 0
                for (let i=0; i<data.length; i++) {
                    if (data[i]=='+') temp++;
                }
                console.log("верных ответов " + temp);
            }
        });
    }     
    if (data==3 && flag==3) {
        fs.readFile(file,'utf-8',(err, data) => {
            if (err) console.log('нет лог-файла с результатом');
            else {
                let temp = 0
                for (let i=0; i<data.length; i++) {
                    if (data[i]=='-') temp++;
                }
                console.log("неверных ответов " + temp);
            }
        });
    }     
    if (data==4 && flag==3) {
        fs.readFile(file,'utf-8',(err, data) => {
            if (err) console.log('нет лог-файла с результатом');
            else {
                let temp = 0
                for (let i=0; i<data.length; i++) {
                    if (data[i]=='+') temp++;
                }
                temp = Math.round((temp/data.length)*100)
                console.log(temp + "% верных ответов");
            }
        });
    }     
 
})