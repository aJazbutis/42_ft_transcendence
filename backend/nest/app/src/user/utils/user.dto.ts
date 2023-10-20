import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsEnum } from 'class-validator';
import { MfaStatus } from 'src/auth/utils/mfa-status';
import { Status } from './status.enum';

export type UserDto = {
    id: string
    login: string
    email: string
    avatar: string
}

export class SessionUserDto {
	@IsString()
	@IsNotEmpty()
	id: string

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	avatar: string;

	@IsEmail()
	email: string;

	@IsBoolean()
	mfaEnabled: boolean;

	@IsEnum(MfaStatus)
	mfaStatus: MfaStatus;

	@IsEnum(Status)
	status: Status;
}