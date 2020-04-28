import logo from "../../assets/logo.png";
import "./Header.scss";

import * as React from "react";
import { VssPersona } from "azure-devops-ui/VssPersona";
import { IGraphUser, mePhoto, me } from "~/aad/MicrosoftGraph";

type SafeType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const Header = () => {
    const [photoUrl, setPhotoUrl]: SafeType<string | undefined> = React.useState<string | undefined>(undefined);
    const [userDisplayName, setUserDisplayName]: SafeType<string | undefined> = React.useState<string | undefined>(undefined);

    const safelyGetPhoto = async (): Promise<string> => {
        try {
            const photo: Blob = await mePhoto();
            return URL.createObjectURL(photo);
        } catch {
            return "";
        }
    };

    const safelyGetDisplayName = async (): Promise<string> => {
        try {
            const user: IGraphUser = await me();
            return user.displayName;
        } catch {
            return "";
        }
    };

    /**
     * Make request to MS Graph API to fetch user's name and profile picture
     */
    const fetchUsernameAndPicture = async () => {
        // Promise.all() fails if ANY of of the provided promises fails...
        // As such, wrap with functions that handle the exception gracefully
        const values: [string, string] = await Promise.all([
            safelyGetPhoto(),
            safelyGetDisplayName()
        ]);

        setPhotoUrl(values[0]);
        setUserDisplayName(values[1]);
    };

    React.useEffect(() => {
        fetchUsernameAndPicture().catch(
            // log(error)
        );
    }, []);

    const identityDetailsProvider = {
        getDisplayName(): string | undefined {
            return userDisplayName;
        },
        getIdentityImageUrl(): string | undefined {
            return photoUrl ? photoUrl : undefined;
        }
    };

    return (
        <header className="flex-row">
            <div className="flex-row flex-center">
                <img alt="logo" id="header-logo" src={logo} />
                <span className="body-l font-weight-semibold">
                    Contoso
                </span>
            </div>
            <VssPersona ariaLabel={userDisplayName} displayName={userDisplayName} identityDetailsProvider={identityDetailsProvider} size="medium" />
        </header>
    );
};

export default Header;