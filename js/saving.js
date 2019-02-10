var saving = {
    resourceList: ["energy","wood","stone","metal","silicon"],
    storage: window.localStorage,
    
    // Extracts progress related stuff and put them into a object which then is saved
    save: function() {
        let player = {buildings:[]}
        $.each(build,function(name,building) {
            if (building.exists) player.buildings.push(name)
        })
        $.each(saving.resourceList,function(index,name) {
            player[name] = resources[name].amount
        })
        saving.storage.setItem("save",JSON.stringify(player))
    },
    
    load: function() {
        let player = saving.storage.getItem("save")
        if (player === null) return
        player = JSON.parse(player)
        $.each(player.buildings,function(index,name) {
            build[name].exists = true
        })
        $.each(saving.resourceList,function(index,name) {
            resources[name].amount = player[name]
        })
    }
}