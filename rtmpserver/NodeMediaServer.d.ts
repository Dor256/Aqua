declare module "node-media-server" {
    class NodeMediaServer {
        constructor(config: any);
        on(event: string, callback: Function): void;
        run(): void;
    }
    export = NodeMediaServer;
}