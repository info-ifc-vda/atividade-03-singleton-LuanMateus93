import GameSettings from "./GameSettings";

const settings1 = GameSettings.getInstance();
console.log("Configurações iniciais:", settings1.getAllSettings());

settings1.setSetting("volume", 80);
settings1.setSetting("resolution", "1280x720");
settings1.setSetting("difficulty", "Difícil");
