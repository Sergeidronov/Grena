const {Perms} = require("../Validation/Permissions");
const {Client} = require("discord.js");
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table')


/**
 * @param {Client} client
 * @param {string[]} args
 * @param {Discord.Message} client
 */
function RunFunction(message, args, client) {}

class   Command {
    /**
     * @typedef {{name: string, description: string, permission: Discord.PermissionString | string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options
     */
     constructor(options) {
         this.name = options.name;
         this.description = options.description;
         this.permission = options.permission;
         this.run = options.run;
     }
}


 module.exports = async (client, PG, Ascii) => {
     const Table = new Ascii("Command Loaded");

     CommandsArray = [];

     (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);
 
        if(!command)
        return Table.addRow(file.split("/")[7], " Failed", "Missing a name")
 
        if(!command.description)
        return Table.addRow(command.name, " Failed", "Missing a description")
 
        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false ;
            else
            return Table.addRow(command.name, " Failed", "Permissions is invalid")
        }
        client.commands.set(command.name, command);
        CommandsArray.push(command);
 
        await Table.addRow(command.name, " SUCCESSFUL")
    });

     console.log(Table.toString());

     // PERMISSIONS CHECK //

     client.on('ready', async () => {
       const MainGuild = await client.guilds.cache.get("928627916718370856")

       MainGuild.commands.set(CommandsArray).then(async (command) => {
           const Roles = (commandName) => {
               const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
               if(!cmdPerms) return null;

               return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
           }
           const fullPermissions = command.reduce((accumulator, r) => {
               const roles = Roles(r?.name);
               if(!roles) return accumulator;
               
               const permissions = roles.reduce((a, r) => {
                   return [...a, {id: r.id, type: "ROLE", permission: true}]
               }, []);

               return [...accumulator, {id: r.id, permissions}]
           }, []);

           await MainGuild.commands.permissions.set({ fullPermissions })
       });
   });
}