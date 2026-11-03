import type { Personal, PersonalLocationAssignment } from "@/types/dataTypes";
import { Building2, Loader } from "lucide-react";

interface Props {
    assignsHeadquarters: Personal['locationAssignments'];
    headquarterSelected: (headquarter: PersonalLocationAssignment) => void;
    isLoading?: boolean;
}

export default function OverlarHeadquarters({ assignsHeadquarters, headquarterSelected, isLoading }: Props) {
    return (
        <>
            <div className="fixed top-0 left-0 z-99999 w-screen h-screen flex flex-col bg-gray-dark ">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="bg-light  rounded-lg shadow-lg p-6 w-96">
                        <div className="flex items-baseline gap-4 justify-center">
                            <h2 className="flex items-center gap-3 text-xl font-semibold mb-4 text-gray-dark"><Building2 className="w-6 h-6 text-gray-dark" /> Selecciona una sede</h2>
                            {isLoading && (

                                <div className="flex justify-center">
                                    <Loader className="text-brand-dark" />

                                </div>
                            )
                            }
                        </div>
                        <ul className="space-x-4 flex">
                            {assignsHeadquarters.map((headquarter) => (
                                <li key={headquarter.id}>
                                    <button
                                        disabled={isLoading}
                                        className="bg-brand p-3 rounded-lg text-light font-bold hover:bg-brand-dark hover:text-light disabled:bg-gray/40 disabled:hover:bg-gray/40"
                                        onClick={() => {
                                            headquarterSelected(headquarter);
                                        }}
                                    >
                                        {headquarter.headquartersId}
                                    </button>
                                </li>
                            ))
                            }
                        </ul>



                    </div>
                </div>
            </div>
        </>
    );
};  