import * as fs from "fs";
import * as path from "path";

class GameSettings {
    private static instance: GameSettings;
    private settingsFilePath: string;
    private settings: { volume: number; resolution: string; difficulty: string };

    private constructor() {
        this.settingsFilePath = path.join(process.cwd(), "config.json");

        console.log("Caminho do arquivo de configuração:", this.settingsFilePath);

        if (!fs.existsSync(this.settingsFilePath)) {
            console.log("Arquivo config.json não encontrado. Criando um novo...");
            this.createDefaultConfig();
        }

        this.settings = this.loadSettings();
    }

    public static getInstance(): GameSettings {
        if (!GameSettings.instance) {
            GameSettings.instance = new GameSettings();
        }
        return GameSettings.instance;
    }

    private createDefaultConfig(): void {
        const defaultSettings = { volume: 50, resolution: "1920x1080", difficulty: "Médio" };
        try {
            fs.writeFileSync(this.settingsFilePath, JSON.stringify(defaultSettings, null, 4), "utf-8");
            console.log("Arquivo config.json criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar config.json:", error);
        }
    }

    private loadSettings(): { volume: number; resolution: string; difficulty: string } {
        try {
            const data = fs.readFileSync(this.settingsFilePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Erro ao carregar configurações. Usando valores padrão:", error);
            return { volume: 50, resolution: "1920x1080", difficulty: "Médio" };
        }
    }

    private saveSettings(): void {
        try {
            fs.writeFileSync(this.settingsFilePath, JSON.stringify(this.settings, null, 4), "utf-8");
            console.log("Configurações salvas em config.json!");
        } catch (error) {
            console.error("Erro ao salvar config.json:", error);
        }
    }

    public setSetting<K extends keyof typeof this.settings>(key: K, value: typeof this.settings[K]): void {
        this.settings[key] = value;
        this.saveSettings();
    }

    public getSetting<K extends keyof typeof this.settings>(key: K): typeof this.settings[K] {
        return this.settings[key];
    }

    public getAllSettings(): object {
        return this.settings;
    }
}

export default GameSettings;
