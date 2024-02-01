"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import LanguageIcon from "@mui/icons-material/Language";
import GroupsIcon from "@mui/icons-material/Groups";
import DevicesIcon from "@mui/icons-material/Devices";
import FactoryIcon from "@mui/icons-material/Factory";
import PaidIcon from "@mui/icons-material/Paid";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Modal from "@mui/joy/Modal";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Textarea from "@mui/joy/Textarea";

import type { AIDemoAsset } from "~/server/models/aidemoAsset";
import { api } from "~/trpc/react";


export function CreateDemoAsset() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [isLoadingMagic, setIsLoadingMagic] = useState(false);
  const [isMagicDialogOpen, setIsMagicDialogOpen] = useState(false);
  const [magicTextInput, setMagicTextInput] = useState("");



  // Get the asset ID from the query string
  const assetId = searchParams.get("id");

  const isEditMode = assetId !== undefined;

  // Get the asset from the API
  const { data: asset } = api.aiDemoAssets.getById.useQuery(assetId ?? "", {
    enabled: isEditMode,
  });

  // Initialize form data with the asset data if in 'edit' mode
  useEffect(() => {
    if (isEditMode && asset) {
      setFormData({
        name: asset.name,
        description: asset.description,
        image: asset.image,
        technologies: asset.technologies,
        industries: asset.industries,
        reference: asset.reference,
        kpis: asset.kpis,
        audience: asset.audience,
        material: asset.material,
        link: asset.link,
        type: asset.type,
      });
    }
  }, [asset, isEditMode]);


  // get industries for autocomplete
  const { data: industries } =
    api.aiDemoAssets.getDistinctIndustries.useQuery();

  // get technologies for autocomplete
  const { data: technologies } =
    api.aiDemoAssets.getDistinctTechnologies.useQuery();

  // get kpis for autocomplete
  const { data: kpis } = api.aiDemoAssets.getDistinctKPIs.useQuery();

  // get audience for autocomplete
  const { data: audiences } = api.aiDemoAssets.getDistinctAudiences.useQuery();

  // load icons
  const { data: images } = api.image.getImages.useQuery();

  const [formData, setFormData] = useState<Omit<AIDemoAsset, "id">>({
    name: "",
    description: "",
    image: "",
    technologies: [],
    industries: [],
    reference: "",
    kpis: [],
    audience: [],
    material: "",
    link: "",
    type: "aidemoasset",
  });

  const createDemoAsset = api.aiDemoAssets.create.useMutation({
    onSuccess: () => {
      router.refresh();
      router.back();
    },
  });

  // Use a different mutation for updating the asset
  const updateDemoAsset = api.aiDemoAssets.update.useMutation({
    onSuccess: () => {
      // Handle success for update
      router.refresh();
      router.back();
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (
      name === "technologies" ||
      name === "industries" ||
      name === "kpis" ||
      name === "audience"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      // Call the update mutation with the asset ID and form data
      updateDemoAsset.mutate({ id: asset!.id, asset: { ...formData } });
    } else {
      // Call the create mutation with the form data
      createDemoAsset.mutate(formData);
    }
  };

  const handleOpenMagicDialog = () => {
    // Reset the text input
    setMagicTextInput("");
    setIsMagicDialogOpen(true);
  };

  const handleCloseMagicDialog = () => {
    setIsMagicDialogOpen(false);
  };

  const handleMagicTextInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const inputText = event.target.value;
    // Cut the text to 6000 words if it's longer
    const words = inputText.split(/\s+/);
    if (words.length > 6000) {
      setMagicTextInput(words.slice(0, 6000).join(" "));
    } else {
      setMagicTextInput(inputText);
    }
  };

  const callMagic = api.magic.getMagic.useMutation({
    onSuccess: (data) => {
      setIsLoadingMagic(false);

      type magicData = {
        title: string;
        description: string;
        technologies: string[];
        industries: string[];
        reference: string;
        kpis: string[];
        audience: string[];
        image: string;
      };

      try {
        const magicData = JSON.parse(data.magic!) as magicData;

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: magicData.title,
          description: magicData.description,
          technologies: magicData.technologies,
          industries: magicData.industries,
          reference: magicData.reference,
          kpis: magicData.kpis,
          audience: magicData.audience,
          image: magicData.image,
        }));
      } catch (e) {
        console.log("error parsing magic data");
      }
    },
    onError: () => {
      setIsLoadingMagic(false);
    },
  });

  const handleMagic = (link: string) => {
    setIsLoadingMagic(true);
    callMagic.mutate({ link: link });
  };

  const callMagicWithText = api.magic.getTextMagic.useMutation({
    onSuccess: (data) => {
      setIsLoadingMagic(false);

      type magicData = {
        title: string;
        description: string;
        technologies: string[];
        industries: string[];
        reference: string;
        kpis: string[];
        audience: string[];
        image: string;
      };

      try {
        const magicData = JSON.parse(data.magic!) as magicData;

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: magicData.title,
          description: magicData.description,
          technologies: magicData.technologies,
          industries: magicData.industries,
          reference: magicData.reference,
          kpis: magicData.kpis,
          audience: magicData.audience,
          image: magicData.image,
        }));
      } catch (e) {
        console.log("error parsing magic data");
      }
      setIsMagicDialogOpen(false);
    },
    onError: () => {
      setIsLoadingMagic(false);
    },
  });

  const handleMagicWithText = () => {
    setIsLoadingMagic(true);
    callMagicWithText.mutate({ text: magicTextInput });
  };

  const magicDialog = (
    // center the dialog in both directions, make it 1/2 of the screen width, bg-white
    <Modal
      open={isMagicDialogOpen}
      onClose={handleCloseMagicDialog}
      className="flex w-full items-center justify-center bg-white"
    >
      <div className="w-1/2 rounded-lg bg-white p-10 shadow-xl">
        <DialogTitle>Use Magic</DialogTitle>
        <DialogContent>
          Paste your text into the box below and click &quot;Use Magic&quot; to
          generate the fields.
        </DialogContent>
        <DialogContent className="mt-6 overflow-auto">
          <Textarea
            id="magicText"
            name="magicText"
            minRows={10}
            placeholder="Paste your text here"
            onChange={handleMagicTextInputChange}
            value={magicTextInput}
            className="mt-10 max-h-48"
            required
          />
        </DialogContent>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="reset"
            className="h-4 bg-gray-400 shadow-sm"
            onClick={handleCloseMagicDialog}
          >
            Cancel
          </Button>
          <Button
            startDecorator={<AutoFixHighIcon />}
            disabled={magicTextInput === "" || isLoadingMagic}
            loading={isLoadingMagic}
            type="submit"
            onClick={handleMagicWithText}
            className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"
          >
            Use Magic
          </Button>
        </div>
      </div>
    </Modal>
  );

  const submitButtonText = isEditMode
    ? updateDemoAsset.isLoading
      ? "Updating..."
      : "Update"
    : createDemoAsset.isLoading
      ? "Submitting..."
      : "Submit";

  return (
    <>
      {magicDialog}
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Demo Asset
          </h2>
          <div className="-mx-3 mt-10 flex flex-wrap">
            {/* Column 1 */}
            <div className="mb-6 w-full px-3 md:w-1/2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name / Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                required
              />

              <label
                htmlFor="link"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                Link
              </label>

              {/* Button Next to the input with Icon */}
              <div className="flex items-baseline">
                <Input
                  type="text"
                  name="link"
                  id="link"
                  startDecorator={<LanguageIcon />}
                  placeholder="https://www.example.com"
                  value={formData.link}
                  onChange={handleChange}
                  className="mr-2 mt-2  h-9 w-full shadow-sm sm:text-sm"
                  required
                />
                {/* disabled when link empty */}
                <Button
                  variant="solid"
                  className={`h-4 shadow-sm ${
                    formData.link === "" || isLoadingMagic
                      ? "bg-gray-400" // Gray background when disabled
                      : "bg-gradient-to-r from-purple-500 to-pink-500" // Gradient background when enabled
                  }`}
                  disabled={formData.link === "" || isLoadingMagic}
                  loading={isLoadingMagic}
                  onClick={() => handleMagic(formData.link)}
                >
                  <AutoFixHighIcon className="h-6 w-6" />
                </Button>
              </div>

              <label
                htmlFor="description"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                required
              />

              <label
                htmlFor="image"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <Autocomplete
                className="mt-2"
                id="image"
                options={images ?? []}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <AutocompleteOption {...props}>
                    <ListItemDecorator>
                    <Image src={`/icons/${option}`} alt={option} width={16} height={16} />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: 'sm' }}>
                      {option}
                    </ListItemContent>
                  </AutocompleteOption>
                )}

                onChange={(event, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    image: newValue!,
                  }));
                }}
                value={formData.image}
              />

            </div>

            {/* Column 2 */}
            <div className="mb-6 w-full px-10 md:w-1/2">
              <label
                htmlFor="technologies"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Technologies
              </label>
              <Autocomplete
                multiple
                className="mt-2"
                id="technologies"
                freeSolo
                startDecorator={<DevicesIcon />}
                options={technologies ?? []}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    technologies: newValue,
                  }));
                }}
                value={formData.technologies}
              />

              <label
                htmlFor="audience"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                Audience
              </label>
              <Autocomplete
                multiple
                className="mt-2"
                id="audience"
                freeSolo
                startDecorator={<GroupsIcon />}
                options={audiences ?? []}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    audience: newValue,
                  }));
                }}
                value={formData.audience}
              />

              <label
                htmlFor="industries"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                Industries
              </label>
              <Autocomplete
                multiple
                className="mt-2"
                id="industries"
                freeSolo
                startDecorator={<FactoryIcon />}
                options={industries ?? []}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    industries: newValue,
                  }));
                }}
                value={formData.industries}
              />
              <label
                htmlFor="kpis"
                className="mt-6 block text-sm font-medium leading-6 text-gray-900"
              >
                KPIs
              </label>
              <Autocomplete
                multiple
                id="kpis"
                className="mt-2"
                freeSolo
                startDecorator={<PaidIcon />}
                options={kpis ?? []}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    kpis: newValue,
                  }));
                }}
                value={formData.kpis}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {/* New Button */}
          <Button
            type="button"
            variant="solid"
            startDecorator={<AutoFixHighIcon />}
            className={`h-6 bg-gradient-to-r from-purple-500 to-pink-500  shadow-sm transition-all duration-1000 ease-in-out hover:from-purple-600 hover:to-pink-600`}
            onClick={handleOpenMagicDialog}
          >
            Use Magic
          </Button>

          <div className="flex items-center gap-x-6">
            {/* Existing Cancel Button */}
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            {/* Existing Submit Button */}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              disabled={
                isEditMode
                  ? updateDemoAsset.isLoading
                  : createDemoAsset.isLoading
              }
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
