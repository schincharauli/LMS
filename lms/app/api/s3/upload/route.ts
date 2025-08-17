import { z } from "zod";

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import { S3 } from "@/lib/S3Client";
import { env } from "@/lib/env";

export const  fileUploadSchema = z.object({
    fileName: z.string().min(1, {message: "file name is required  "}),
    contentType: z.string().min(1, {message: "Content type is required"}),
    size: z.number().min(1, {message: "size is required"}),
    imageSize: z.boolean().optional(),
    isImage: z.boolean().optional()

})

export async function POST(request: Request){
    try {
        const body = await request.json();
        const validation = fileUploadSchema.safeParse(body)

        if(!validation.success) {
            return NextResponse.json(
            { error:" Invalid Request Body"},
            {status: 400}

            )
        }

        const {fileName, contentType, size} = validation.data

        const uniqueKey = `${uuidv4()}-${fileName}`

        const command = new PutObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE,
            ContentType: contentType,
            ContentLength: size, 
            Key: uniqueKey
        })

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 360, 
        });

        const response = { 
            presignedUrl, 
            key: uniqueKey
        };

        return NextResponse.json(response)
    } catch {
        return NextResponse.json(
            { error:" Invalid Request Body"},
            {status: 500}
        )
    }

}