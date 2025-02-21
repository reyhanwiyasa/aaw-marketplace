import {
  InternalServerErrorResponse,
  NotFoundResponse,
} from "@src/shared/commons/patterns";
import { getTenantById } from "../dao/getTenantById.dao";

export const getTenantService = async (tenant_id: string) => {
  console.log(tenant_id);
  try {
    console.log("ini tenant_id di getTenant.service: ", tenant_id);
    const tenant = await getTenantById(tenant_id);
    if (!tenant) {
      return new NotFoundResponse("Tenant not found").generate();
    }

    return {
      data: {
        ...tenant,
      },
      status: 200,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
