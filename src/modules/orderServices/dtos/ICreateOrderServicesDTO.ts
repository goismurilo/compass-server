export default interface ICreateOrderServicesDto {
    clientIDFK: string;
    technicianIDFK: string;
    secretaryIDFK: string;
    serviceIDFK: string;

    obsSecretary: string;

    statusIDFK: string;
    isClosed: boolean;
}
