import React, { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useFetchClient, useNotification } from '@strapi/strapi/admin';
import { ArrowLeft as ArrowLeftIcon } from '@strapi/icons';
import { Layouts } from '@strapi/admin/strapi-admin';
import { Loader, Link, Box } from '@strapi/design-system';
import { PLUGIN_ID } from '../pluginId';
import getTrad from '../helpers/getTrad';
import { RedirectForm } from '../components/RedirectForm';

const DetailPage = () => {
  const { get, post, put } = useFetchClient();
  const { formatMessage } = useIntl();
  const { id: selectedRedirectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const notification = useNotification();
  const [redirect, setRedirect] = useState(undefined);
  const [resetCount, setResetCount] = useState(0);
  const isNewRedirect = window.location.href.endsWith('new');

  useEffect(() => {
    if (selectedRedirectId) {
      getRedirect();
    }
  }, [selectedRedirectId]);

  const getRedirect = async () => {
    try {
      setIsLoading(true);
      const { data } = await get(`/${PLUGIN_ID}/${selectedRedirectId}`);

      setRedirect(data);
    } catch (error) {
      console.error(error);
      setRedirect(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData, submitMore) => {
    try {
      if (!formData || !formData.from) {
        throw new Error('No form values');
      }

      if (isNewRedirect) {
        await createRedirect(formData);

        navigate(`/plugins/${PLUGIN_ID}`);
      } else {
        await updateRedirect(formData);

        navigate(`/plugins/${PLUGIN_ID}`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.details
      ) {
        const errorType = error.response.data.error.details.type;
        notification.toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: getTrad(`detail.form.save.notify.error.${errorType}.message`),
          }),
        });
      } else {
        notification.toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: getTrad('detail.form.save.notify.error.general.message'),
          }),
        });
      }
    }
  };

  const createRedirect = async (redirect) => {
    const result = await post(`/${PLUGIN_ID}`, { data: redirect });

    if (!result.data) {
      notification.toggleNotification({
        type: 'warning',
        message: formatMessage({
          id: getTrad(`detail.form.save.notify.error.${result.error.details.type}.message`),
        }),
      });
    }

    notification.toggleNotification({
      type: 'success',
      message: formatMessage({
        id: getTrad('detail.form.save.notify.success.new.message'),
      }),
    });

    return { id: result.data.id, ...result.data.attributes };
  };

  const updateRedirect = async (redirect) => {
    await put(`/${PLUGIN_ID}/${selectedRedirectId}`, {
      data: redirect,
    });

    notification.toggleNotification({
      type: 'success',
      message: formatMessage({
        id: getTrad('detail.form.save.notify.success.message'),
      }),
    });
  };

  const handleBack = () => {
    navigate(`/plugins/${PLUGIN_ID}`);
  };

  return (
    <Box>
      <Layouts.BaseHeader
        navigationAction={
          <Link startIcon={<ArrowLeftIcon />} onClick={handleBack}>
            {formatMessage({ id: getTrad('detail.header.back') })}
          </Link>
        }
        title={formatMessage({
          id: getTrad(isNewRedirect ? 'detail.header.title.new' : 'detail.header.title'),
        })}
        as="h2"
      />
      <Layouts.Content>
        <Box>
          {isLoading && !isNewRedirect && <Loader />}
          {(!isLoading || isNewRedirect) && (
            <RedirectForm
              initialValues={redirect}
              handleSubmit={handleSubmit}
              isNew={isNewRedirect}
              resetCount={resetCount}
            />
          )}
        </Box>
      </Layouts.Content>
    </Box>
  );
};

export default memo(DetailPage);
