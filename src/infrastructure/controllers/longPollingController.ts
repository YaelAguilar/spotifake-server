import { Request, Response } from 'express';

const waitForNextRelease = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const fakeRelease = {
                artist: "Billie Eilish",
                single: "Happier Than Ever",
                createdAt: new Date().toISOString()
            };
            resolve(fakeRelease);
        }, 10000);
    });
};

export const longPollingController = async (req: Request, res: Response) => {
    console.log("Iniciando Long Polling...");

    const latestRelease = await waitForNextRelease();

    res.json(latestRelease);
};
