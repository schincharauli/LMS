import { z } from "zod";

const envSchema = z.object({

        AWS_ACCESS_KEY_ID: z.string().min(1),
        AWS_SECRET_ACCESS_KEY: z.string().min(1),
        AWS_ENDPOINT_URL_S3: z.string().min(1),
        AWS_ENDPOINT_URL_IAM: z.string().min(1),
        AWS_REGION: z.string().min(1),
        NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE: z.string().min(1)
  
   


    // experimental__runtimeEnv: {
    //     NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE

    // }
});

export const env = envSchema.parse(process.env);
