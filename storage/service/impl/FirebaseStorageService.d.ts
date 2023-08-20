/// <reference types="node" />
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { UploadRequest } from 'src/storage/dto/request/UploadRequest';
import { IStorageService } from 'src/storage/service/IStorageService';
import { UploadResponse } from 'src/storage/dto/response/UploadResponse';
/**
 * Firebase/Google cloud storage
 * Required define in .env
 *        STORAGE_DRIVER=firebase
 *        STORAGE_FIREBASE_BUCKET=<firebase storage bucket name>
 *        STORAGE_FIREBASE_KEY_FILE_PATH=<firebase-adminsdk-account.json>
 */
export declare class FirebaseStorageService implements IStorageService {
    private readonly bucket;
    private readonly log;
    private readonly expireDays;
    constructor(configService: ConfigService);
    uploadFile(file: UploadRequest): Promise<UploadResponse>;
    getFile(key: string): Promise<Readable>;
    getFilesFromDir(prefix: string): Promise<string[]>;
    getSignedUrl(key: string): Promise<string>;
    deleteFile(key: string): Promise<boolean>;
    deleteFileByDirectory(prefix: string): Promise<void>;
}